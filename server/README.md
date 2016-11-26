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
