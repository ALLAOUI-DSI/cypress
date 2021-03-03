/// <reference types="Cypress" />
// Le commentaire précédent ^ indique au éditeur la nature du document afin de fournir la suggestion du code et la saisie automatique.
// Attention: ne pas modifier le nombre de slashes. 

context('La page index ', () => {
    it('Vérifier la valeur email dans la fenêtre modale', () => {

        const email = "test@test.com"

        // Naviguer vers la page index servie par le serveur local (verifier le numéro du port).
        cy.visit('http://localhost:2021/');

        // Pointer sur l'entrée email et saisir une nouvelle valeur.
        // La fonction clair() est optionnelle, sont rôle est de vider le champs avant de saisir.
        cy.get('#email').clear().type(email);

        //Pointer sur le bouton action, puis effectuer un clic.
        cy.get('#showModal').click();

        // Attendre que la fenêtre modale soit visible et que les événement sont attachés aux boutons. 
        cy.wait(700);

        //Pointer sur l'element (p) à l'intérieur de la fenêtre modale et vérifier sont contenu.
        cy.get("#emailInModal").should('have.text', email);

        //Pointer sur le bouton fermer de la fenêtre modale et effectuer un clic
        cy.get('#closeModal').click();

        //Pointer sur la fenêtre modale et vérifier qu'elle n'est plus visible
        cy.get('#exampleModal').should('not.be.visible');

    });


    // Only est ajouté pour executer uniquement ce test, par default tous les tests à l'intérieur du context serons exécutés
    it/*.only*/("Vérifier la somme de deux valeurs à partir d'une list de choix unique" , () => {
        cy.visit('http://localhost:2021/');

        
        // On pointe sur les options de l'opérande premier puis on clic sur la première option (dont la valeur est 1)
        cy.get('[name=op1]').eq(0).click();

        // On pointe sur les options de l'opérande deuxième puis on clic sur la troisième option (dont la valeur est 7)
        cy.get('[name=op1]').eq(2).click();


        cy.get('#addition').click();

        cy.get('#resultatAddition').should("have.text", "8");

        
    });
});