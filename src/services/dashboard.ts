import { getDashboardData } from '../models/dashboard';

export const getDashobardData = async () => {
    let res;
    try {
        let data = await getDashboardData();
        res = {
            ok: true,
            status: 200,
            message: "OK",
            data
        }
    } catch (ex) {
        res = {
            ok: false,
            status: 200,
            message: ex.message,
            data: null
        }
    }
    return res;
}