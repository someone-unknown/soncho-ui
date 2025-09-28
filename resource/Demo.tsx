import {JSXElement} from 'solid-js';

import {RangeInput} from './component/RangeInput';

export function Demo(): JSXElement {
  return (
    <div>
      <RangeInput minValue={0} maxValue={100} step={0.01} />
    </div>
  );
}

export default Demo;