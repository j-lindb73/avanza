/**
 * Test for getting started with Selenium.
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;


// Does not work with WSL!! Use cygwin

function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
        element.click();
    });
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith(target));
    });
}

function assertH1(target) {
    browser.findElement(By.css("h1")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}

function assertH2(target) {
    browser.findElement(By.css("h2")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}

function assertH3(target) {
    browser.findElement(By.css("h3")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}

function assertButton(target) {
    browser.findElement(By.css("button")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}




// Test suite
test.describe("ME-AVANZA TESTING", function() {
    this.timeout(0);

    test.beforeEach(function(done) {
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        browser.get("http://localhost:8082/");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test landing page", function(done) {

        browser.getTitle().then(function(title) {
            assert.equal(title, "me-avanza");
        });

        assertH1("Hasselstigens Avanza");
        assertButton("Logga in");
        assertH3("Chat");
        matchUrl("/");
        
        done();
    });
    
    test.it("Test Chat-page", function(done) {
        goToNavLink("Chat");
        
        matchUrl("/chat");
        
        done();
    });
    
    test.it("Test Admin - with submenus", function(done) {
        
        goToNavLink("Admin");
        matchUrl("/register" );
        assertButton("Registrera");
        assertH2("Registrera användare");
        
        goToNavLink("Logga in");
        matchUrl("/login" );
        assertH2("Logga in användare");
        assertButton("Logga in");
        
        goToNavLink("Registrera användare");
        matchUrl("/register" );
        assertH2("Registrera användare");
        assertButton("Registrera");

        done();
    });




});


