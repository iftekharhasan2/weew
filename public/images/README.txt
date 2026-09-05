This folder is for the rare static asset that must be served from the site
itself (a favicon, an OG image).

Everything the CMS manages — slide backgrounds, headshots, partner logos,
trailer video — is uploaded from /admin straight to the Cloudinary CDN, and
MongoDB stores only the resulting https:// URL. Do not add CMS media here: it
would not appear on other environments and could not be changed without a
redeploy.

The shipped defaults reference /images/ahmmad_zaman_tariq.jpg. Either drop that
file here, or (better) re-upload the headshot from the admin Testimonials tab
so it is served from the CDN like everything else.
