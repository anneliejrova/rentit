import './style.css';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { navigate } from './router.js';

renderHeader();
renderFooter();
navigate(location.hash.slice(1) || 'home');