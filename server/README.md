```
{
  me {
    user {
      id
      profile {
        name
      }
    }

    systems {
      weather(days: 5) {
        temperature(unit:"k") {
          unit
          value
        }
        cloudCover
        day
        date
        uvIndex
        visibility
        weatherIcon
        weatherText
      }
      salesRep {
        name
        phone
        email
        title
        photo
        textable
      }

      address {
        street
        street2
        state
        city
        zip
      }

      progress {
        title
        description
        steps {
          title
          description
          completed
        }
      }

      production(startDate: "2016-11-21", step:"daily") {
        startDate
        total
        step
        measurements {
          unit
          value
          created
        }
      }

      consumption(startDate: "2016-11-21", step:"daily") {
        startDate
        total
        step
        measurements {
          unit
          value
          created
        }
      }
    }
  }
}
```
