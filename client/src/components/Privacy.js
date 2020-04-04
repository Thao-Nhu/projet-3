import React from 'react';
import NavBar from './NavBar.js';
class Privacy extends React.Component{
    render(){
        return(
            <div>
            <NavBar/>
            <div className="message">
            We consider the privacy of our guests a serious responsibility. This policy declares how we will use and treat information we collect from and about you. This policy is an agreement that is legally binding. By using our website, you consent to the collection and use of information by us as specified below.

                We commit with all sincerity to:
                <ul>
                <li>never sell your information;</li>
                <li>never use your information to market our lodging to you for future stays without requiring your "opt in" and permitting your "opt out." To date, we have never performed such marketing;</li>
                <li>only collect the minimum of information as is customarily necessary to provide lodging;</li>
                <li>only share information about you when (a) required by law or (b) required by situations that demand immediate action that are to your clear benefit (i.e., "emergencies"). </li>
                </ul>
                If you wish to reserve accommodation we will collect the personal information necessary to handle your booking. This information normally includes:
                <ul>
                <li>Name</li>
                <li>Mailing address</li>
                <li>Telephone number(s)</li>
                <li>E-mail address</li>
                <li>Information related to any need you may have for special services</li>
                </ul>
                We use your individual information only to communicate with you about your reservation, to process your payments, to make arrangements for your comfort and convenience while you are our guest, and to advise you about personal items you may inadvertently leave during your stay.
            </div>
           
            </div>
        )
    }
}
export default Privacy;