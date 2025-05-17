import axios from 'axios';
import { ApiResponse } from '@/shared/interfaces/IApiResponse';
import { Items } from '@/shared/interfaces/INavItem';
import { NavDropdownItem } from "@/shared/interfaces/INavItem";

const handleAPIs = {
    getData: async (url: string): Promise<ApiResponse | Items[]> => {
        const response = await axios.get(url);
        return response.data;
    }
};

export default handleAPIs;