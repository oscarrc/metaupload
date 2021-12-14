
import { List, File } from "./List";

const Manager = ({files, ipfs, onDel}) => {
    return (
        <figure>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <List ipfs={ipfs}>
                    {
                        files.map((file, index) => (
                            <File index={index} file={file} onDel={onDel} />
                        ))
                    }
                </List>
            </table>
        </figure>
    )
}

export default Manager;