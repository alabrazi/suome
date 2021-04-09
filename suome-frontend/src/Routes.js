import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TopBen from './components/TopBenif';
import Dashboard from './components/Dashboard';
import Schedule from './components/home/ContentCard/Schedule';
import Item from './components/home/ContentCard/Item';
import Questions from './components/Questions';
import Profile from './components/ProfilePage';
import LogInModal from './components/LogInModal';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import NotFound from './components/NotFound';
import TopicEntry from './components/TopicEntry';
import TopicEntryAll from './components/TopicEntryAll';
import Notification from './components/notifications/Notification';
import WordsHeatMapAll from './components/WordsHeatMapAll';
import About from './components/About';
import Ala from './components/Ala';
const Routes = () => (
	<Switch>
		<Route exact path="/" component={TopBen} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/questions" component={Questions} />
		<Route path="/schedule" component={Schedule} />
		<Route path="/notifications" component={Notification} />
		<Route exact path="/profile" component={Profile} />
		<Route path="/profile/:userId?" component={Profile} />
		<Route path="/login" component={LogInModal} />
		<Route path="/profileupdate" component={ProfileUpdateModal} />
		<Route path="/topic/:id/:pageIndex?" component={Item} />
		<Route path="/admintopic" component={TopicEntry} exact />
		<Route path="/admintopic/:id" component={TopicEntry} />
		<Route path="/words" component={WordsHeatMapAll} />
		<Route path="/topicsall" component={TopicEntryAll} />
		<Route path="/about" component={About} />
		<Route path="/ala" component={Ala} />
		<Route path="*" component={NotFound} />
	</Switch>
);

export default Routes;
