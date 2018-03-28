import CMS from "netlify-cms";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import ArtPostPreview from "./preview-templates/ArtPostPreview";
import HomePagePreview from "./preview-templates/HomePagePreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("art", ArtPostPreview);
CMS.registerPreviewTemplate("home", HomePagePreview);
