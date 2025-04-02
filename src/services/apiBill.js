import axios from 'axios';

export const getBills = async () => {
    try {
        const response = await axios.get(
            "https://cc9c-2405-4803-fbb0-7a70-55f3-b84c-52dd-529e.ngrok-free.app/bills/",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            }
        );
        return response.data.map(bill => ({
            ...bill,
            amount: parseFloat(bill.amount)
        }));
    } catch (error) {
        console.error("Error fetching bills:", error);
        throw new Error("Error fetching bills");
    }
};
