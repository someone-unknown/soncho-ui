import {JSXElement} from 'solid-js';
import {render} from 'solid-js/web';

import {Demo} from './Demo';

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
  render((): JSXElement => <Demo />, document.body);
});