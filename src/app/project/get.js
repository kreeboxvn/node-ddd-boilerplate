/**
 * function for getter project.
 */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = () => {
    return Promise.resolve()
      .then(() =>
        userRepository.getAll({
          attributes: [
            'id',
            'name',
            'address',
            'contact',
            'tin',
            'sss',
            'philhealth',
            'isDeleted',
            'createdBy',
            'updatedBy'
          ]
        })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
