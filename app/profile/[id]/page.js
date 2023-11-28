"use client"
import { InnerHero, ProfileSection, Footer } from "@/devlink";
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function Profile({ imageData }) {
    // const { query } = useRouter()
    const params = useParams()
    console.log(params)
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('')
    const [office, setOffice] = useState('')
    const [cell, setCell] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')
    const [categories, setCategories] = useState('')
    const [area, setArea] = useState('')
    const [imageUrl, setImageUrl] = useState(null);

    const fetchContact = async () => {
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
                        categoryArr.push(cat.Value[key].Label);
                    }
                })
                setCategories(categoryArr)
                console.log(categoryArr)
            }
            let areaArr = []
            let areas = json.FieldValues[52];
            if (areas.FieldName == 'Service Area') {
                Object.keys(areas.Value).forEach(function (key, index) {
                    if (areaArr.indexOf(areas.Value[key].Label) == -1) {
                        areaArr.push(areas.Value[key].Label);
                    }
                })
                setArea(areaArr)
            }
        }
    }

    useEffect(() => {
        if (contact === '') {
            fetchContact();
        }
    })

    return (
        <main>
            <InnerHero />
            <ProfileSection
                profMainName={contact.DisplayName}
                profMainComp={contact.Organization}
                profTitle={title}
                profOrganization={contact.Organization}
                profAddress={address}
                profOffice={office}
                profCell={cell}
                profEmail={contact.Email}
                profWebsite={website}
                profLogo={logo}
                profCategories={categories}
                profArea={area}
            />
        </main>
    );
}