import DealsPage from 'containers/DealsPage';
import ProfileSettingPage from 'containers/ProfileSettingPage';
import FavoritePage from 'containers/FavoritePage';
import ChangePasswordPage from 'containers/ChangePasswordPage';
import TransactionPage from 'containers/TransactionPage';
import icoProfileSetting from 'images/icons/mbri-setting-3.svg';
import icoMyAds from 'images/icons/mbri-photo.svg';
import icoFavoriteList from 'images/icons/mbri-magic-stick.svg';
import icoTransaction from 'images/icons/mbri-shopping-cart.svg';
import icoChangePassword from 'images/icons/mbri-setting.svg';

const userRoutes = [
  { path: '/user/profile-setting', name: 'Profile Settings', component: ProfileSettingPage, icon: icoProfileSetting },
  { path: '/user/my-ads', name: 'My Ads', component: DealsPage, icon: icoMyAds },
  { path: '/user/favorite', name: 'Favorite List', component: FavoritePage, icon: icoFavoriteList },
  { path: '/user/transaction', name: 'Transactions', component: TransactionPage, icon: icoTransaction },
  { path: '/user/change-password', name: 'Change Password', component: ChangePasswordPage, icon: icoChangePassword },
];

export default userRoutes;
