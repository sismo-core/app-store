import { ZkAppType } from "../libs/spaces"
import { AppFront } from "./getSpaceConfigsFront"

export const getImpersonateAddresses = (app: AppFront | ZkAppType) => {
    return app.impersonateAddresses || [
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "github:vbuterin",
        "twitter:VitalikButerin:423423",
        "telegram:VitalkButerin:423423",
        "0x644177f8d79117c2b9c7596527642b3c2d05888e",
        "0xca55123aba844d347d0a18d91a958eda531447ff"
    ]
}