"use client"
import { InnerHero, ProfileSection } from "@/devlink";
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import BlueBtn from "@/components/BlueBtn";

export default function Profile() {
    // const { query } = useRouter()
    const router = useRouter();
    const params = useParams()
    // console.log(params)
    const [event, setEvent] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [organization, setOrganization] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [billingEmail, setBillingEmail] = useState('')
    const [consent, setConsent] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [newFName, setNewFName] = useState('');
    const [newLName, setNewLName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [loggedId, setLoggedId] = useState('');
    const [registrationId, setRegistrationId] = useState('');
    const [registered, setRegistered] = useState(false)

    const fetchEvent = async () => {
        var { Id, DisplayName, Email, FirstName, LastName, MembershipLevel, Status, token } = JSON.parse(localStorage.getItem("GFWBAUSER"));
        setLoggedId(Id);
        setFirstName(FirstName);
        setLastName(LastName);
        setEmail(Email);
        setNewFName(FirstName);
        setNewLName(LastName);
        setNewEmail(Email);
        // let response = await fetch('/api/allContacts', {
        let response = await fetch(`/api/event/${params.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            console.log('response not ok')
        }
        if (response.ok) {
            // console.log(json)
            const eventStart = new Date(json.StartDate);
            const eventEnd = new Date(json.EndDate);
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            let startDate = eventStart.toLocaleDateString(undefined, options);
            let endDate = eventEnd.toLocaleDateString(undefined, options);
            setEvent(json)
            setStart(startDate)
            setEnd(endDate)
            console.log(json)
            if (json.registrations[0]) {
                console.log(json)
                let attendees = []
                json.registrations.forEach(element => {
                    attendees.push(element.Contact.Id)
                });
                console.log(attendees.includes(Id))
                if (attendees.includes(Id)) {
                    setRegistered(true)
                }
            }
        }
    }

    const handleRegistration = async (e) => {
        var { Id, DisplayName, Email, FirstName, LastName, MembershipLevel, Status, token } = JSON.parse(localStorage.getItem("GFWBAUSER"));
        e.preventDefault();
        let registrationInfo = { FirstName: newFName, LastName: newLName, Organization: organization, Phone: phone, Email: newEmail, billEmail: billingEmail, consent: consent, contactId: Id, registrationType: registrationId }

        let response = await fetch('/api/event/eventRegistration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ token, registrationInfo, id: event.Id })
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            console.log('response not ok')
        }
        if (response.ok) {
            // console.log(json)
            setRegistering(false)
        }
    }
    function cancelRegistration() {
        setRegistering(false)
    }

    useEffect(() => {
        // if (!localStorage.getItem("GFWBAUSER")) {
        //     router.push('/login');
        // } else {
        // var { Id, DisplayName, Email, FirstName, LastName, MembershipLevel, Status, token } = JSON.parse(localStorage.getItem("GFWBAUSER"));
        // if (Status === 'Lapsed') {
        //     router.push('/login');
        // }
        if (event === '') {
            fetchEvent();
        }
        // }
    })

    return (
        <main>
            <InnerHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
            <div>
                <div>
                    <h2>Title: {event.Name}</h2>
                    <h3>Location: {event.Location}, { }</h3>
                    <p>Date/Time: {start} - {end}</p>
                </div>

            </div>
            {!registered &&
                <ul>
                    {event.Details && event.Details.RegistrationTypes.map(e =>
                        <li key={e.Id}>
                            <h4>{e.Name}</h4>
                            <p>{e.Description}</p>
                            <p>Price: ${e.BasePrice}</p>
                            {registering ?
                                <div>
                                    <h3>Registration</h3>
                                    {/* {console.log(contact)} */}
                                    <form onSubmit={handleRegistration}>
                                        <label for='First Name'>First Name</label>
                                        <input
                                            className='hi'
                                            type="text"
                                            placeholder={firstName}
                                            value={newFName}
                                            onChange={(e) => { setNewFName(e.target.value) }}
                                        />
                                        <label for='Last Name'>Last Name</label>
                                        <input
                                            className='hi'
                                            type="text"
                                            placeholder={lastName}
                                            value={newLName}
                                            onChange={(e) => { setNewLName(e.target.value) }}
                                        />
                                        <label for='Email'>Email</label>
                                        <input
                                            className='hi'
                                            type="text"
                                            placeholder={email}
                                            value={newEmail}
                                            onChange={(e) => { setNewEmail(e.target.value) }}
                                        />
                                        <label for='organization'>Organization</label>
                                        <input
                                            className='hi'
                                            type="text"
                                            placeholder='organization'
                                            value={organization}
                                            onChange={(e) => { setOrganization(e.target.value) }}
                                        />
                                        <label for='phone'>Office Phone</label>
                                        <input
                                            className='hi'
                                            type="text"
                                            placeholder="phone number"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value) }}
                                        />
                                        <label for='billing'>Accounting or Billing Address</label>
                                        <input
                                            className='hi'
                                            type="text"
                                            placeholder="Accounting or Billing Address"
                                            value={billingEmail}
                                            onChange={(e) => { setBillingEmail(e.target.value) }}
                                        />
                                        <label for='consent'>We would like to send you relevant text messages</label>
                                        <button onClick={() => setConsent(true)}>Yes</button>
                                        <button onClick={() => setConsent(false)}>No</button>
                                        {consent ? <p>You have consented to receive relevant messages</p> : <p>You have opted not to receive relevant messages</p>}
                                        <input type='submit' onClick={() => { setRegistrationId(e.Id) }} />
                                    </form>
                                    <button onClick={cancelRegistration}>Cancel</button>
                                </div> :
                                <div onClick={() => setRegistering(true)}>
                                    <BlueBtn text={'Register'} />
                                </div>
                            }
                        </li>
                    )}
                </ul>
            }
            {console.log(event)}
        </main>
    );
}