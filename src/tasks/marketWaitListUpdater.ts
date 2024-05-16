import firebase from '../firebase/firebase';
import MarketApi from '../api/marketApi';
import { MARKET_API_URLS, FIREBASE_COLLECTIONS } from '../constants';
import { WaitListItemDTO } from '../DTO/marketDTO';

let existingDocuments: WaitListItemDTO[] = [];

/**
 * 거래소 대기 상품 목록을 업데이트합니다.
 *
 * @description
 * - 거래소 API를 통해 대기 중인 상품 목록을 가져와 데이터베이스에 업데이트합니다.
 * - 기존 데이터와 비교하여 변경된 항목만 추가/업데이트/삭제합니다.
 */
const marketWaitListUpdater = async (): Promise<void> => {
  try {
    // 거래소 API를 통해 대기 중인 상품 목록을 가져옵니다.
    const marketWaitList = await MarketApi.getWorldMarketWaitList(MARKET_API_URLS.KR);
    if (!marketWaitList) {
      console.error('거래소 대기 상품 목록을 가져오는 중 에러 발생');
      return;
    }
    // 서버 시작 시 한 번만 existingDocuments를 가져옵니다.
    if (existingDocuments.length === 0) {
      existingDocuments = await firebase.getDocuments<WaitListItemDTO>(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST);
    }

    // 변경된 항목을 처리합니다.
    const updatedItems = marketWaitList.filter(item => !existingDocuments.some(doc => doc.timestamp === item.timestamp));
    const deletedItems = existingDocuments.filter(doc => !marketWaitList.some(item => item.timestamp === doc.timestamp));

    // 변경된 항목을 데이터베이스에 반영합니다.
    const updatePromises = updatedItems.map(item => firebase.addDocument(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST, item, item.timestamp.toString()));
    const deletePromises = deletedItems.map(doc => firebase.deleteDocument(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST, doc.timestamp.toString()));
    await Promise.all([...updatePromises, ...deletePromises]);

    // existingDocuments를 업데이트합니다.
    existingDocuments = marketWaitList;
  } catch (error) {
    console.error('거래소 대기 상품 목록 업데이트 중 에러 발생:', error);
  }
};

export default marketWaitListUpdater;