import v8 from 'v8';
import {CFG} from '../consts/consts';

const structuredClone = (cfg: CFG): CFG => {
    return v8.deserialize(v8.serialize(cfg));
};

export default structuredClone;