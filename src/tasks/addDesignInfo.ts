import { FIREBASE_COLLECTIONS } from "../constants";
import addDesignInfoService from "../services/addDesignInfoService";

const addDesignInfo = {
    // 가공무역 데이터 추가
    addCrateDesignInfo: async () => {
        await addDesignInfoService.addData(
            9200,
            9602,
            FIREBASE_COLLECTIONS.CRATE_DESIGN,
            FIREBASE_COLLECTIONS.CRATE_PRODUCT,
            FIREBASE_COLLECTIONS.CRATE_INGREDIENT,
            "Crate"
        );
    },

    // 범선, 호위선, 숲길 마차 데이터 추가
    addMountDesignInfo: async () => {
        await addDesignInfoService.addData(
            8510,
            8510,
            FIREBASE_COLLECTIONS.MOUNT_DESIGN,
            FIREBASE_COLLECTIONS.MOUNT_PRODUCT,
            FIREBASE_COLLECTIONS.MOUNT_INGREDIENT
        );
        await addDesignInfoService.addData(
            8807,
            8807,
            FIREBASE_COLLECTIONS.MOUNT_DESIGN,
            FIREBASE_COLLECTIONS.MOUNT_PRODUCT,
            FIREBASE_COLLECTIONS.MOUNT_INGREDIENT
        );
        await addDesignInfoService.addData(
            8812,
            8812,
            FIREBASE_COLLECTIONS.MOUNT_DESIGN,
            FIREBASE_COLLECTIONS.MOUNT_PRODUCT,
            FIREBASE_COLLECTIONS.MOUNT_INGREDIENT
        );
    }
};

export default addDesignInfo;
