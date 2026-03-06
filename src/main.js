import './style.css';
import { renderFooter } from './components/footer.js';
import { navigate } from './router.js';

renderFooter();
navigate(location.hash.slice(1) || 'home');