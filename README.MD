# Génération de CV

Ce script NodeJS génère mon CV au format Word à partir de l'API de mon CMS Strapi en GraphQL.

Ce même CMS alimente aussi la page CV de mon portfolio.

Du coup quand je modifie une donnée de mon CV sur mon CMS, la page CV de mon portfolio en ligne est mise à jour ainsi que mon CV Word et PDF.

[Lien vers le CMS](https://gabriel-brun-resume-backend.herokuapp.com/admin)

[Page CV de mon portfolio où il est aussi disponible en .docx et .pdf](https://www.developpeur-react-nord.com/cv/)

# Comment lancer le script

- cd dans le dossier qui contient ce README.MD
- npm i
- si besoin, modifier le template default-resume-template.docx à votre sauce
- si besoin, ajuster le script node à votre sauce en particulier le OPTIONS.resumeTemplate dans index.ts
- npm start

# Comment mettre à jour le CV word et pdf dans mon portfolio

- s'assurer d'avoir le template default-resume-emplate.docs dans OPTIONS.resumeTemplate dans index.ts
- lancer le script comme indiqué avant
- lancer ./cpCVToWebSite.sh
- ouvrir le dossier React Nord avec code et vérifier qu'il y a bien le nouveau CV en word et en pdf
- s'il n'y a pas le nouveau CV, vérifier que le script shell cpCVToWebSite.sh contient le bon chemin pour ajouter le CV en .docx et en .pdf dans le bon dossier
- commit le nouveau CV dans React Nord et push
- vérifier en production que ça fonctionne après le build du nouveau site
