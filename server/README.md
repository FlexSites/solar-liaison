```
{
  user {
    id
    profile {
      name
      badgeId
    }
  }

  contact {
    name
    phone
    email
    title
    photo
    textable
  }

  systems {
    address {
      street
      street2
      state
      zip
    }

    progress {
      title
      description
      complete
      steps {
        title
        description
        completed
      }
    }
    consumption {
      unit
      value
      created
    }
    production {
      unit
      value
      created
    }
  }
}
```
