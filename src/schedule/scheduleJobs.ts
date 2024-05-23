import schedule from "node-schedule";
import updateMarketWaitList from "../tasks/updateMarketWaitList";
import updateIngredientsMarketPrice from "../tasks/updateIngrediantsMarketPrice";

// 스케줄러 시작 함수
export const scheduleJobs = () => {
    // 1분마다 거래 대기 목록 업데이트 작업을 수행합니다.
    schedule.scheduleJob("*/10 * * * *", async () => {
        await updateIngredientsMarketPrice();
    });

    // 10분마다 재료 시세 업데이트 작업을 수행합니다.
    schedule.scheduleJob("*/1 * * * *", async () => {
        await updateMarketWaitList();
    });
};
