import axios from 'axios';
import {CIRCLE_API_BASE_URL, CIRCLE_API_ENDPOINT, NOBLE_GRAND_DOMAIN_ID} from "src/constants/constants.ts";
import {AttestationApiResponse} from "src/types/Attestations.ts";

const fetchAttestation = async (txHash: string): Promise<string | AttestationApiResponse> => {
    try {
        const response = await axios.get(`${CIRCLE_API_BASE_URL}/${CIRCLE_API_ENDPOINT}/${NOBLE_GRAND_DOMAIN_ID}/${txHash}`);
        return response.data.messages[0]
    } catch (err: any) {
        console.error('Failed to fetch attestation:', err)
        if (err.response.data.error === 'Transaction hash not found') {
            return 'Tx hash not found. Try again later.'
        } else return err.response.data.error
    }
};

export default fetchAttestation;
