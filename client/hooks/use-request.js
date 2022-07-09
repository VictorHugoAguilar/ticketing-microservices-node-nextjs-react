import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios[method](url, { ...body, ...props });
            console.log(response.data)

            if (onSuccess) {
                onSuccess(response.data)
            }
        } catch (err) {
            console.log(err.response.data)
            setErrors(
                <div className="alert alert-danger">
                    <h6>Ooops...</h6>
                    <ul className="my-0">
                        {
                            err.response.data.errors.map(err =>
                                <li key={err.message}>{err.message}</li>
                            )
                        }
                    </ul>
                </div>
            )
        }
    };
    return { doRequest, errors };
}; 