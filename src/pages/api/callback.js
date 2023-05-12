


const handler = async (req, res) => {
  try {
    let access_token = req.query.access_token
    let expires_in = req.query.expires_in
    let token_type = req.query.token_type
    let refresh_token = req.query.refresh_token
    let account_username = req.query.account_username
    let account_id = req.query.account_id
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}

export default handler