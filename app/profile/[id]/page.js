"use client"
import { InnerHero, ProfileSection } from "@/devlink";
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function Profile({ imageData }) {
    // const { query } = useRouter()
    const router = useRouter();
    const params = useParams()
    // console.log(params)
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('')
    const [office, setOffice] = useState('')
    const [cell, setCell] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')
    const [categories, setCategories] = useState('')
    const [area, setArea] = useState('')
    const [updating, setUpdating] = useState(false)
    const [newFName, setNewFName] = useState('');
    const [newLName, setNewLName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loggedId, setLoggedId] = useState('')
    const [imageUrl, setImageUrl] = useState(null);

    const fetchContact = async () => {
        if (localStorage.getItem("GFWBAUSER")) {
            var { Id } = JSON.parse(localStorage.getItem("GFWBAUSER"));
            setLoggedId(Id);
        }
        // let response = await fetch('/api/allContacts', {
        let response = await fetch(`/api/contact/${params.id}`, {
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
            console.log(json)
            setContact(json)
            setAddress(` ${json.FieldValues[43].Value}, ${json.FieldValues[44].Value}, ${json.FieldValues[45].Value} ${json.FieldValues[46].Value}`)
            setTitle(` ${json.FieldValues[39].Value}`)
            setOffice(` ${json.FieldValues[25].Value}`)
            setCell(` ${json.FieldValues[40].Value}`)
            setWebsite(` ${json.FieldValues[48].Value}`)
            // let imageData = json.FieldValues[49].Value.Url.blob()
            // const imageUrl = URL.createObjectURL(imageData);
            // console.log(json.profLogo)
            // const logoUrl = URL.createObjectURL(json.profLogo);
            // console.log(logoUrl)
            // setLogo(logoUrl)
            let categoryArr = []
            let cat = json.FieldValues[47];
            if (typeof cat == 'object') {
                Object.keys(cat.Value).forEach(function (key, index) {
                    if (categoryArr.indexOf(cat.Value[key].Label) == -1) {
                        if (index > 0) {
                            categoryArr.push(`, ${cat.Value[key].Label}`);
                        } else {
                            categoryArr.push(cat.Value[key].Label);
                        }
                    }
                })
                setCategories(categoryArr)
                // console.log(categoryArr)
            }
            let areaArr = []
            let areas = json.FieldValues[52];
            if (areas.FieldName == 'Service Area') {
                Object.keys(areas.Value).forEach(function (key, index) {
                    if (areaArr.indexOf(areas.Value[key].Label) == -1) {
                        if (index > 0) {
                            areaArr.push(`, ${areas.Value[key].Label}`);
                        } else {
                            areaArr.push(areas.Value[key].Label);
                        }
                    }
                })
                setArea(areaArr)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var { Id, DisplayName, Email, FirstName, LastName, MembershipLevel, Status, token } = JSON.parse(localStorage.getItem("GFWBAUSER"));
        let changes = {}
        // "if" cases to identify elements changed prior to sending to api
        if (newFName !== '') { changes.FirstName = newFName }
        if (newLName !== '') { changes.LastName = newLName }
        // if (email !== '') { changes.Email = email }
        // if (password !== '') { changes.Password = password }

        let response = await fetch('/api/user/userInfo', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ token, changes, 'id': contact.Id, 'loggedId': Id })
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            console.log('response not ok')
        }
        if (response.ok) {
            // console.log(json)
            setUpdating(false)
            setNewFName('')
            setNewLName('')
            setNewEmail('')
            setNewPassword('')
            const { accounts, critChange, token } = json
            const { Id, DisplayName, Email, FirstName, LastName, IsAccountAdministrator, MembershipLevel, Status } = accounts
            setContact(accounts)
            const contact = { Id, DisplayName, Email, FirstName, LastName, IsAccountAdministrator, MembershipLevel: MembershipLevel.Name, Status, token }
            // console.log(contact)
            localStorage.setItem("GFWBAUSER", JSON.stringify(contact));
            if (critChange) {
                // remove localStorage and redirect to a log back in page
                localStorage.removeItem("GFWBAUSER");
            }
        }
    }
    function cancelUpdate() {
        setUpdating(false)
    }

    useEffect(() => {
        if (contact === '') {
            fetchContact();
        }
    })

    return (
        <main>
            <InnerHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/login' }} />
            {updating ?
                <div>
                    <h3>Update</h3>
                    {/* {console.log(contact)} */}
                    <form onSubmit={handleSubmit}>
                        <label for='First Name'>First Name</label>
                        <input
                            className='hi'
                            type="text"
                            placeholder={contact.FirstName}
                            value={newFName}
                            onChange={(e) => { setNewFName(e.target.value) }}
                        />
                        <label for='Last Name'>Last Name</label>
                        <input
                            className='hi'
                            type="text"
                            placeholder={contact.LastName}
                            value={newLName}
                            onChange={(e) => { setNewLName(e.target.value) }}
                        />
                        <label for='Email'>Email</label>
                        <input
                            className='hi'
                            type="text"
                            placeholder={contact.Email}
                            value={newEmail}
                            onChange={(e) => { setNewEmail(e.target.value) }}
                        />
                        <label for='Password'>Password</label>
                        <input
                            className='hi'
                            type="text"
                            placeholder="Password"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />
                        <input type='submit' />
                    </form>
                    {/* <p>{contact.DisplayName}</p>
                    <p>{contact.Email}</p>
                    <p>{contact.FirstName}</p>
                    <p>{contact.LastName}</p> */}
                    <p>Membership Status: {contact.Status}</p>
                    {/* <p></p> */}
                    <button onClick={cancelUpdate}>Cancel</button>
                </div>
                :
                <>
                    <ProfileSection
                        profMainName={contact.DisplayName}
                        profMainComp={contact.Organization}
                        profTitle={title}
                        profOrganization={contact.Organization}
                        profAddress={address}
                        profOffice={office}
                        profCell={cell}
                        profEmail={contact.Email}
                        profEmailAddress={{ href: `mailto:${contact.Email}` }}
                        profWebsite={website}
                        profWebsiteAddress={{ href: website, target: '_blank' }}
                        profLogo={logo}
                        profCategories={categories}
                        profArea={area}
                    />
                    {params.id == loggedId && <button onClick={() => setUpdating(true)}>Update</button>}
                </>
            }
        </main>
    );
}