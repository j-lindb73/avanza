<template>
  <div class="w3-content" style="max-width:1400px">
    <Nav />

    <article class="w3-animate-opacity w3-card-4 w3-row">
        
      <img class="w3-card-2 w3-col m4 l3"  src="../assets/johan.jpg" width="300" alt="Bild på mig">
      <div class="w3-padding-large w3-col m8 l9 w3-large">
        <p>Gift med Sophie och med fyra barn spenderar jag mitt liv i Tranås. Det är en stad mitt emellan Jönköping och Linköping fast INTE utmed E4:an utan man svänger 
        av i Gränna alternativt Mjölby för att komma till denna sommarpärla.</p>
        <p>Den ligger vid sjön Sommen som är en fantastisk sjö för båtar med alla dess öar, 365 st sägs det.</p> 
        <p>Mina intressen som jag utövar regelbundet är sång och musik, detta i ett par olika körer. Sedan blir det en hel del flängande i närområdet på grund av barnens 
        utövande av sport, i nuläget fotboll i Tranås FF</p>
        <p>Jag har jobbat med IT de senaste 20 åren och nu vill jag skapa mig en fast grund att stå på när det gäller programmering. 
        Gillar att lära mig och få koll på nya saker så detta passar mig - att få studera mitt i yrkeslivet - vilken lyx!</p>
        <p>Väl mött!!</p>

        Johan Lindberg
      </div>
    </article>

    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/views/Footer'

export default {
  name: 'Me',
  props: { },
  components: {
    Nav,
    Footer
  }
}
</script>

<style scoped>
  article {
    text-align: left;
  }
</style>