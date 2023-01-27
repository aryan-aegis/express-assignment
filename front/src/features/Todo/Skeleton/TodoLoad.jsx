import style from "./todoload.module.css"
import { Skeleton } from '@chakra-ui/react'

let ske = new Array(4).fill(0);
export function TodoLoad() {
    return (<table className={style.mainTable}>
        <thead className={style.tabHead}>
            <tr>
                {ske.map((el) => {
                    return (
                        <th>
                            <Skeleton height={"25px"} />
                        </th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
            <tr>
            {ske.map((el) => {
                    return (
                        <td>
                            <Skeleton height={"15px"} />
                        </td>
                    )
                })}
            </tr>
            <tr>
            {ske.map((el) => {
                    return (
                        <td>
                            <Skeleton height={"15px"} />
                        </td>
                    )
                })}
            </tr>
        </tbody>
    </table>)
}