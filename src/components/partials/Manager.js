import { convertSize } from '../../utils/sizes';

const Manager = ({files}) => {
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
                <tbody>
                    {
                        files.map(file => (
                            <tr key={file.cid}>
                                <td>{file.name}</td>
                                <td>{convertSize(file.size)}</td>
                                <td>{file.type}</td>
                                <td>TODO</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </figure>
    )
}

export default Manager;