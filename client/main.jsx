import React from 'react';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { EditContactForm } from '/imports/ui/EditContactForm';



FlowRouter.route('/', {
	name: 'root',
	action(){
		render(<App/>, document.getElementById('react-target'));
	}
});

FlowRouter.route('/edit', {
	name: 'edit',
	action(params, queryParams){
		render(<EditContactForm data = {queryParams}/>, document.getElementById('react-target'));
	}
});