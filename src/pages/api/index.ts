import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res
        .status(404)
        .json({})
    
    return
    await axios.post(
        'https://script.google.com/macros/s/AKfycbx1nYKgCPmtaqG1zm9u7W6lNe3ByoFg6shXi9JMrq1DdBIJjtqGI-nh9qLi7obd_qaRkQ/exec',
        req.body as string,
    )
        .then((axiosRes: AxiosResponse) => {
            res
                .status(axiosRes.status)
                .json(axiosRes.data)
        })
}