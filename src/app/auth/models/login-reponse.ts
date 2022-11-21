import RegisterResponse from "./register-response";

export default interface LoginResponse extends RegisterResponse {
    registered: boolean
}
