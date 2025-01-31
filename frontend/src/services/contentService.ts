// import { BASEURL, privateAxios } from "../config/axiosConfig";

// // interface ContentProps {
// //     _id: string;
// //     type: string;
// //     link?: string;
// //     text?: string;
// //     tags?: string[];
// //     userId: string;
// //     timestamp: Date;

// // }

// interface ContentProps {
//     _id: string;
//     type: string;
//     link: string;
//     text: string;
//     timestamp: string;
// }
// export async function getContent(): Promise<ContentProps[] | undefined> {
//     try {
//         const response = await privateAxios.get(`${BASEURL}/api/v1/content`);
//         return response.data.content;
//     } catch (error) {
//         console.error("Error getting content:", error);
//         return undefined;
//     }
// }