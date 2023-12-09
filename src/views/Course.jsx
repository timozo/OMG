import { useParams } from 'react-router-dom';

export default function Course() {
    let { id } = useParams();
    return (
        <h1 style={{color: "white"}}>{id}</h1>
    );
  }
  