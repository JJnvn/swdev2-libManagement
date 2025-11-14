import api from "@/lib/api";

export default async function fetcher(url: string) {
    const res = await api.get(url);
    return res.data.data;
}
