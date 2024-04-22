This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Code That Needs to Be Implemented/Verified on Every Update

**devlink/Base21WebflowSection.js**

Remove the second homeGridRightSlot

```
export function Base21WebflowSection({
  as: _Component = _Builtin.Section,
  heading = {},
  subHeading = {},
  sideHeading = {},
  baseHeading = "THE FEDERATION",
  baseSubheading = "Your Three Tiered Membership",
  baseSideHeading = "ASSOCIATIONSTAFF",
  baseGridLeftSlot,
  homeGridRightSlot,
}) {
```

**devlink/MemberListItem.js**

Ensure the following is added to the file before the return statement

```
const [imageURL, setImageURL] = useState("");

useEffect(() => {
    getImage();
}, []);

const getImage = async () => {
   try {
    const res = await axios.get(
        `api/cron/get-contacts-image?id=${memberListLogo}`
    );

    setImageURL(res.data.wildapricotUrl);
   } catch (e) {
    console.log(e);
   }
};
```

Don't forget to import useState and useEffect from react and axios

```
import { useState, useEffect } from "react";
import axios from "axios";
```
