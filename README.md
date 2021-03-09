- [Introduction](#introduction)
  - [Connaissances essentielles](#connaissances-essentielles)
- [Prérequis](#prérequis)
  - [NodeJs](#nodejs)
  - [npm](#npm)
  - [Cypress](#cypress)
  - [git](#git)
  - [Visual Studio Code](#visual-studio-code)
  - [serve](#serve)
- [Vérification de l'environnement](#vérification-de-lenvironnement)
- [Tester avec Cypress](#tester-avec-cypress)
  - [Structure d'un script de test](#structure-dun-script-de-test)
  - [`only` et `skip`](#only-et-skip)
  - [Structure d'un projet de test](#structure-dun-projet-de-test)
  - [AAA: Arrange, Act, Assert](#aaa-arrange-act-assert)
  - [Application du paradigme AAA](#application-du-paradigme-aaa)
- [Cas d'utilisation](#cas-dutilisation)
  - [Arrange](#arrange)
    - [Visiter une page](#visiter-une-page)
    - [Exécuter une requête HTTP](#exécuter-une-requête-http)
    - [Hooks](#hooks)
    - [`get` et `$`](#get-et-)
    - [Naviguer dans le DOM](#naviguer-dans-le-dom)
    - [Modifier les cookies](#modifier-les-cookies)
    - [Importer JSON via `fixture`](#importer-json-via-fixture)
  - [Act](#act)

# Introduction 
[Cypress](http://cypress.io) est un outil de test fonctionnel dit End-to-End (e2e). Il permet d'automatiser les taches de manipulation et d'interaction avec l'application WEB. L'objective de ce répertoire et de proposer une introduction à l'outil et les étapes nécessaires pour l'installer et commencer à rédiger et exécuter des scripts de test. 
## Connaissances essentielles
Le development des scripts de test pour Cypress demande une connaissance du langage Javascript et une expérience avec l'outil de gestion des dépendances [npm](https://www.npmjs.com/get-npm). De plus, la syntaxe de [selection de jQuery](https://api.jquery.com/category/selectors/) est également indispensable. Son utilité sera discutée dans les paragraphes suivants.

# Prérequis
Les outils suivants sont nécessaires pour se lancer dans Cypress.
## NodeJs
A télécharger depuis [nodejs.org](https://nodejs.org/en/download/). Il est conçu initialement pour exécuter Javascript au niveau du serveur (i.e: serveur WEB JS). On l'utilise ajourd'hui pour exécuter des scripts Javascript et Typescript localement sans besoin d'un navigateur WEB. Vérifier l'installation avec la commande\
 `node -v` \
![version node](media/node_version.png).

## npm
Géstionnaire de dépendances des applications JS. Pour chaque project géré par `npm` on lui attache un fichier `package.json` qui comporte toutes les informations relatives à l'application (version, description, dépendances, commandes à exécuter, [etc.](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)). `npm` est inclus avec Node.  
Vérifier l'installation avec la commande:\
 `node -v`\
![version npm](media/npm_version.png). 

## Cypress
Outil de test e2e. Permet l'exécution des script de test JS. Il offre une interface graphique qui aide à visualiser et suivre l'exécution du test. Un avantage majeur de Cypress est la possibilité d'inspecter l'état du test à un moment donné via des Snapshots. L'outil est à installer avec `npm` globalement (pour que la commande:\
 `cypress open`\
 soit accessible n'import où sur votre machine). La commande d'installation est:\
`npm install cyress -g`\
Vérifier l'installation avec la commande:\
 `cypress -v`\
![version cypress](media/cypress_version.png)
## git
`git` est un système de gestion de versions. Il permet de suivre l'évolution d'un projet et de restaurer une version précédente du même projet sans perdre l'état actuel. `git` est un outil essentiel pour le development en équipe, où chaque membre reçoit  une copie (via `git clone`) d'un répertoire dit `remote`. La version d'origine du projet est modifiée après un `commit` suivi d'un `push` depuis la version locale.  
Télécharger et installer `git` depuis [git-scm.com](https://git-scm.com/download). Vérifier l'installation avec la commande:\
`git --version`\
![version git](media/git_version.png)\
Nous allons utiliser `git` pour avoir une copie de ce répertoire.
## Visual Studio Code
VSCode est un environnement de development intégré (IDE) gratuit développé par Microsoft. Voir les extensions conçues pour le development des scripts Cypress, il est recommandé  d'utiliser VSCode au lieu d'un éditeur de texte basique. A télécharger et installer depuis [visualstudio.com](https://code.visualstudio.com/download). Ensuite ajouter depuis l'onglet des extensions [*Cypress Snippets*](https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets). Ce dernier va nous permettre d'accélérer le development des scripts Cypress par des raccourcies et la saisie automatique.

## serve
`serve` est un utilitaire légère pour la création des serveurs WEB locaux à partir des fichiers source statiques. Ce répertoire contient une page WEB statique  qu'on va utiliser comme sujet de test. `serve` va nous permettre de lancer un serveur local sur l'adresse `http://localhost:PORT/`. Cypress va naviguer vers cette adresse pour effectuer les tests proposés. Commande d'installation :\
`npm i serve -g`\
Vérifier l'installation par la commande:\
`serve -v`\
![version serve](media/serve_version.png)

# Vérification de l'environnement
Pour vérifier l'intégralité de notre environnement du travail on propose de lancer un premier test. Commencer par cloner ce repértoire par la commande suivante:\
`git clone https://github.com/ALLAOUI-DSI/cypress.git` \
Vous serez ramener à saisir votre identifiant et mot de passe Github. Une fois fait, ouvrez le dossier dans VSCode et lancer un nouveau terminal pour installer les dépendances nécessaires par la commande suivante:\
`npm install` \
Attention au dossier du travail. La commande précédente doit être exécutée depuis le dossier racine du projet (crée par la commande `git`). Ensuite, on démarre le serveur local par la commande suivante:\
`npm run local`\
Cette commande va lancer un script définit dans le fichier `package.json`. Elle est équivalente à la commande suivante:\
`serve --port=2021`\
(Si vous modifiez le port, vous devrez modifier également les liens dans les fichiers de  test `*.spec.js`).\
Vérifiez le démarrage du serveur local en accédant à la page http://localhost:2021/  
Ensuite, on ajoute une nouvelle fenêtre du terminal pour lancer les scripts de test. Dans le nouveau terminal lancer la commande suivante:\
`npm run cy:open` \
Cette commande est équivalente à la commande suivante:\
`cypress open` \
Depuis l'interface graphique de Cypress lancez l'exécution des tests.\
![interface graphique Cypress](media/cypress_window.png) \
Une nouvelle fenêtre du navigateur va être affichée où les tests serons exécutés.\
![résultats des tests Cypress](media/cypress_test_results.png)
# Tester avec Cypress
## Structure d'un script de test
Un fichier de test Cypress est un script JS intitulé par convention `PAGE.spec.js` alors chaque page de l'application WEB on lui associe un script de test. Le script contient un ou plusieurs tests à exécuter. Chaque script est composé d'un objet `context()` qui encapsule tous les tests définis par des fonctions `it()`. Chaque définition de `it()` est un test à exécuter indépendamment d'autre test. Le code suivant représente un exemple basique d'un script de test:\
```javascript
context('Description de la suite de tests', () => {
    it('Description du test 1', () => {
        // ...
    }
    it('Description du test 2', () => {
        // ...
    }
}
```

## `only` et `skip`
Si la suite de tests contient plusieurs tests (plusieurs fonctions `it`), il est souvent intéressant -surtout dans la phase du développement des tests- d'avoir un mécanisme de control des tests. Par défault, tous les tests sont exécutés sans exception. Le rôle de `only` est de limiter l'exécution à ce test. Dans l'exemple suivant, seulement le test nommé 'test 1' sera exécuté.
```javascript
it.only('test 1 ', {
  //...
})
it('test 2', {
  //....
})
```
`skip` est utilisé pour sauter un test. Dans l'exemple suivant le test nommé 'test 2' ne sera pas exécuté.
```javascript
it('test 1 ', {
  //...
})
it.skip('test 2', {
  //....
})
```

## Structure d'un projet de test
Les fichiers au sien d'un projet Cypress sont organisés suivant la [hiérarchie](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html) suivante:
```
Intitulé du projet/
├─ cypress/
│  ├─ fixtures/
│  │  ├─ exemple_donnee.json
│  ├─ integration/
│  │  ├─ exemple_page_1.spec.js
│  │  ├─ exemple_page_2.spec.js
│  ├─ plugins/
│  ├─ support/
├─ package.json
├─ cypress.json
```
Le fichier `cypress.json` et le dossier `cypress` sont généré automatiquement après la première execution de la commande `cypress open`. Le fichier `cypress.json` est un fichier de [configuration](https://docs.cypress.io/guides/references/configuration.html) de Cypress, là où on modifie les paramètres d'exécution de Cypress, par exemple le navigateur à utiliser, la taille de la fenêtre du navigateur, la durée de `timeout` par défault, etc. Le code suivant représente un exemple du fichier `cypress.json`.
```json
{
	"baseUrl": "http://localhost:1337/",
	"viewportHeight" : 768,
	"viewportWidth":1024,
}
```
Le dossier `cypress/integration` est l'emplacement par défault des scripts de test. Tous ces scripts serons affichés dans l'interface graphique de Cypress. Si on lance l'execution avec la commande `cypress run` (qui lance les tests sans passer par l'interface graphique de Cypress) tous les scripts qui se trouve dans ce dossier serons éxecuté automatiquement. Pour exclure un fichier on modifie l'option `ignoreTestFiles` au niveau du fichier `cypress.json`.\
Le dossier `cypress/fixtures` contient les fichiers de données statiques qui peuvent être utilisés pour alimenter un test. On utilise des fichier `json` qui serons importés en tant qu'objets JS, en utilisant la fonction [`cy.fixture()`](https://docs.cypress.io/api/commands/fixture.html).\
Les dossiers `cypress/plugins` et `cypress/support` contiennent des fichiers supplémentaires pour une utilisation avancé. Cette partie ne sera pas traitée dans ce support.\
Il est possible de changer l'emplacement de ces dossiers en modifiant le fichier de configuration. Par exemple, la modification du dossier des tests se fait avec l'option `integrationFolder`:
```json
{
    "video": false,
    "integrationFolder": "dossier-de-test/sous-dossier"
}
```
## AAA: Arrange, Act, Assert 
Un test Cypress peut être divisé en trois phases: Arrange (organiser ou préparer), Act (agir) et Assert (affirmer). Dans la première phase (**Arrange**) on prépare l'état de l'application à tester, par exemple visiter l'adresse de la page et s'authentifier. La deuxième phase (**Act**) consiste à interagir avec la page, comme une saisie ou un clic, c'est une simulation d'un utilisation normale de l'application. La dernière phase (**Assert**) est de verifier que l'état attendu est obtenu, par exemple: vérifier qu'un message d'erreur est affiché lors d'une une saisie erronée.

## Application du paradigme AAA
Dans le premier test su script [`index.spec.js`](cypress/integration/index.spec.js) la technique AAA est appliquée comme suit:
- Arrange: visiter la page d'accueil `/`.
- Act: saisir l'adresse email et clic sur le bouton action.
- Assert: vérifier que la même adresse est affichée dans la fenêtre modale.

# Cas d'utilisation
Dans cette section nous allons aborder des cas d'utilisation dans chaque phase de test. A chaque phase des cas pratiques  TODO...
<!-- TODO : Complete this -->

## Arrange
### Visiter une page
L'accès à une page WEB se fait par la fonction `cy.visit(URL)`. Exemple: `cy.visite('https://www.google.com/')`. Si on a précisé une URL racine de l'application dans le fichier de configuration:
```json
{
    "baseUrl": "https://www.google.com"
}
```
On peut alors accéder à une page en utilisant un chemin relatif: `cy.visit('/maps')`. Ceci est équivalant à la l'instruction `cy.visite('https://www.google.com/maps')`. L'avantage de ce choix est la possibilité de changer la racine de l'application à partir d'un seul point, au lieu d'aller modifier tous les fichiers de tests.
### Exécuter une requête HTTP
Des fois on a besoin d'effectuer des requêtes de type POST, GET ou autres. Comme par exemple s'authentifier avant d'acceder à l'application. Cypress propose l'instruction [`request`](https://docs.cypress.io/api/commands/request.html) qui lance une connexion asynchrone à un serveur distant. 
```javascript
cy
.request('POST', '/login', { username: 'Flan1337', password:'s3cr3t' })
  .then((response) => {
    // Traitement ...
  }) 
``` 
### Hooks
Si une request doit être exécutée avant chaque test, il est donc possible d'implémenter une fonction de type [Hooks](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Hooks). Parmi ces fonctions on trouve `before`, `beforeEach`, `after`, `afterEach`. Ces fonctions sont appelées automatiquement par Cypress selon le tableau suivant:

|Hook | Description|  
|-----|-------|
|`before` | Exécutée une seule fois avant l'éxecution du premier test|
|`after` |  Exécutée une seule fois après l'éxecution de dernier test|
|`beforeEach` | Exécutée avant chaque test du même bloc|
|`afterEach` | Exécutée après chaque test du même bloc|

Exemple d'execution:
``` javascript
before({...})

beforeEach({...})
it('test1',{...})
afterEach({...})

beforeEach({...})
it('test2',{...})
afterEach({...})

after({...})
```

### `get` et `$`
`cy.get(SELECTOR)` et `$(SELECTOR)` sont utilisées pour pointer sur un élément du DOM.`get` est plus général que `$`, cette dernière est limitée au `selector` connu par `jQuery`. `SELECTOR` est une expression de type `jQuery selector` qui décrit comment acceder à l'element. 
```javascript
cy.get('button') // tous les elements de type button
cy.get('#info') // l'element avec l'id info
cy.get('.clsActive') // tous les elements avec la classe clsActive
// etc...
```
Voir la [documentation](https://docs.cypress.io/api/commands/get.html) pour plus de details.

### Naviguer dans le DOM
Parfois l'accès direct à un element n'est pas possible, pour cela on utilise des méthodes qui permettent de localiser un elément à partir d'un autre.\
**find:** trouver un elément au sein d'un autre
```javascript
// trouver les boutons avec la classe send qui se trouve à l'intérieur de l'element avec l'id formCompte.

cy.get('#formCompte').find('button.send') 

``` 
`parent`: accèder au parent de l'elèment.
```javascript
cy.get('li.active').parent()
```
`parents`: accèder à la liste des parents de l'elèment
```javascript
cy.get('footer').parents()
```
Il exist d'autre [fonctions](https://docs.cypress.io/api/api/table-of-contents.html) de la même nature: `next`, `prev`, etc. 

### Modifier les cookies
La manipulation des cookies est effectuée par les méthodes `getCookies` (retourner la list de tous les cookies), `getCookie` (retourner une cookie identifiée par son nom) et `setCookie` (enregistrer une nouvelle cookie).
```javascript
cy.setCookie('session', 'SGkgdGhlcmUgOik=') 
``` 

### Importer JSON via `fixture`
La fonction `fixture` de Cypress permet de lire un fichier de type `json` depuis le dossier `cypress/fixtures` et d'importer son contenu au bloc de test.

Le fichier `cypress/fixtures/user.json` :
```json
{
  "username":"flan1337",
  "password":"s3cre3t"
}
```

```javascript
context('importer json via fixture',{
  let user
  
  before(()=>{
    cy.fixture('user.json').then((u)=>{
      user = u
    })
  })

  it('remplir à partir du contenu du json',{
    cy.visit('/login')
    cy.get('input#username').input(user.username)
    cy.get('input#password').input(user.password)
  })
})
```

## Act
Cypress propose plusieurs méthodes d'interaction avec l'application WEB. clic, saisie, etc.\
**Clic sur un bouton**
```javascript
cy.get('#btnSend').click() 
``` 

**Vider un champ de text**
```javascript
cy.get('[formcontrolname="email"]').clear()
```
**Saisir dans un champ de text**
```javascript
cy.get('[formcontrolname="address"]').type('19 rue Chaabi')
```



