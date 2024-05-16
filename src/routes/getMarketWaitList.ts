import express, { Request, Response } from 'express';
import firebase from '../firebase/firebase';
import { WaitListItemDTO } from '../DTO/marketDTO';
import { FIREBASE_COLLECTIONS } from '../constants';

const router = express.Router();

/**
 * 거래소 대기 상품 목록을 가져와 응답합니다.
 * 
 * @description
 * - 데이터베이스에서 거래소 대기 상품 목록을 조회하여 응답합니다.
 * - 저장 프로시저를 사용하여 데이터를 가져옵니다.
 */
router.get('/getMarketWaitList', async (req: Request, res: Response) => {
    try {
        let documents: WaitListItemDTO[] = await firebase.getDocuments(FIREBASE_COLLECTIONS.MARKET_WAIT_LIST);

        // 응답합니다.
        res.status(200).json(documents);
    } catch (error) {
        console.error('거래소 대기 상품 목록을 가져오는 중 에러 발생:', error);
        res.status(500).json({ error: '거래소 대기 상품 목록을 가져오는 중 에러 발생' });
    }
});

export default router;
