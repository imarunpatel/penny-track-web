
interface IAPIBaseResponse {
    code: number
}

interface IAPISuccessResponse<DType = any> extends IAPIBaseResponse {
    success: true
    data: DType
}

interface IAPIErrorResponse extends IAPIBaseResponse {
    success: false
    error: string
    appCode: number
}

export type IAPIResponse<T> = IAPISuccessResponse<T> | IAPIErrorResponse

// export interface IAPIResponse<T> {
//     code: number
//     success: boolean
//     data?: T
//     error?: string
// }