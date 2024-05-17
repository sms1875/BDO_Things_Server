import firebaseService from '../firebase/firebaseService';
import MarketApi from '../api/marketApi';
import { MARKET_API_URLS, FIREBASE_COLLECTIONS } from '../constants';
import { WaitListItemDTO } from '../DTO/marketDTO';

// 캐시된 대기 상품 목록 데이터
let cachedWaitListData: WaitListItemDTO[] = [];
// 초기화 상태 플래그
let isInitiated = false;

/**
 * 캐시된 대기 상품 목록 데이터를 초기화합니다.
 */
const initCachedWaitListData = async (): Promise<void> => {
  cachedWaitListData = await firebaseService.getDocuments<WaitListItemDTO>(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST);
  isInitiated = true; // 초기화 후 플래그를 true로 설정합니다.
  console.log('캐시된 대기 상품 목록 데이터가 초기화되었습니다.');
};

/**
 * 거래소 대기 상품 목록을 업데이트합니다.
 *
 * @description
 * - 거래소 API를 통해 대기 중인 상품 목록을 가져와 데이터베이스에 업데이트합니다.
 * - 기존 데이터와 비교하여 변경된 항목만 추가/업데이트/삭제합니다.
 * - 일괄 작업을 활용하여 성능을 개선하고 Firebase 비용을 절감합니다.
 */
const updateMarketWaitList = async (): Promise<void> => {
  try {
    // 거래소 API를 통해 대기 중인 상품 목록을 가져옵니다.
    const marketWaitList = await MarketApi.getWorldMarketWaitList(MARKET_API_URLS.KR);
    if (!marketWaitList) {
      console.error('거래소 대기 상품 목록을 가져오는 중 에러 발생');
      return;
    }

    // 변경된 항목을 처리합니다.
    const { updatedItems, deletedItems } = getChangedItems(marketWaitList, cachedWaitListData);

    // 일괄 작업을 생성합니다.
    const batch = firebaseService.createBatch();

    // 변경된 항목을 일괄 작업에 추가합니다.
    updatedItems.forEach((item) => {
      const itemRef = firebaseService.doc(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST, item.timestamp.toString());
      batch.set(itemRef, item);
    });
    deletedItems.forEach((doc) => {
      const docRef = firebaseService.doc(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST, doc.timestamp.toString());
      batch.delete(docRef);
    });

    // 일괄 작업을 커밋합니다.
    await firebaseService.commitBatch(batch);

    // 캐시된 대기 상품 목록 데이터를 업데이트합니다.
    cachedWaitListData = marketWaitList;
    console.log('거래소 대기 상품 목록 업데이트가 완료되었습니다.');
  } catch (error) {
    console.error('거래소 대기 상품 목록 업데이트 중 에러가 발생했습니다:', error);
  }
};

/**
 * 변경된 항목을 가져옵니다.
 *
 * @param {WaitListItemDTO[]} marketWaitList - 거래소 대기 상품 목록
 * @param {WaitListItemDTO[]} existingDocuments - 기존 문서 데이터
 * @returns {{ updatedItems: WaitListItemDTO[], deletedItems: WaitListItemDTO[] }} 변경된 항목
 */
const getChangedItems = (
  marketWaitList: WaitListItemDTO[],
  existingDocuments: WaitListItemDTO[]
): { updatedItems: WaitListItemDTO[]; deletedItems: WaitListItemDTO[] } => {
  // 추가된 항목을 필터링합니다.
  const updatedItems = marketWaitList.filter((item) => !existingDocuments.some((doc) => doc.timestamp === item.timestamp));
  // 삭제된 항목을 필터링합니다.
  const deletedItems = existingDocuments.filter((doc) => !marketWaitList.some((item) => item.timestamp === doc.timestamp));
  return { updatedItems, deletedItems };
};

/**
 * 거래소 대기 상품 목록 업데이터를 실행합니다.
 */
const marketWaitListUpdater = async (): Promise<void> => {
  if (!isInitiated) await initCachedWaitListData();
  await updateMarketWaitList();
};

export default marketWaitListUpdater;