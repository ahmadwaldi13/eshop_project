import User from '../models/User.js'
import path from 'path'
import fs from 'fs'
export default class UserController {
    static getAll = async (req, res) => {
        try {
            const results = await User.getAll()

            if(results.length === 0) {
                res.status(404).json({
                    msg: 'Data users is empty'
                })
            }else {
                res.status(200).json(results)
            }
        } catch (error) {
            console.info(error.message)
        }
    }
    static getUserById = async (req, res) => {
        const id = req.params.id

        try {
            const [ result ] = await User.getUserById(id)

            if(result === undefined || result === null) {
                res.status(404).json({
                    msg: 'Data user not found'
                })
            }else {
                res.status(200).json(result)
            }
        } catch (error) {
            console.info(error.message)
        }

    }
    static add = async (req, res) => {
        const newDataUser = req.body

        try {
            const response = await User.add(newDataUser)
            const { affectedRows } = response

            if(affectedRows > 0) {
                res.status(201).json({
                    msg: 'Data added successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'data was not successfully added'
                })
            }
        } catch (error) {
            console.info(error.message)
        }

    }
    static remove = async (req, res) => {
        const id = req.params.id

        try {
            const [ checkUser ] = await User.getUserById(id)
            if(checkUser === undefined || checkUser === null) {
                res.status(404).json({
                    msg: 'The User you want to delete doesnt found'
                })
            }else {
                const { profile_image } = checkUser
                if(profile_image !== null) {
                    const split = profile_image.split('/')
                    const profileImageName = split[split.length - 1]
                    const profileImagePath = `./public/images/${profileImageName}`
                    fs.unlinkSync(profileImagePath)
                }

                const response = await User.remove(id)
                const { affectedRows } = response
                if(affectedRows > 0) {
                    res.status(200).json({
                        msg: 'Data deleted successfully'
                    })
                }else {
                    res.status(400).json({
                        msg: 'Failed to delete data user'
                    })
                }
            }
            
        } catch (error) {
            console.info(error.message)
        }
    }
    static update = async (req, res) => {
        const dataUserUpdate = req.body
        const fileProfileImage = req.files?.profile_image
        const id = req.params.id
        
        try {
            const [ checkUser ] = await User.getUserById(id)
            if(checkUser === undefined || checkUser === null) return res.status(404).json({
                msg: 'User not found'
            })
            
            const { profile_image } = checkUser
            let profileImage

            if(fileProfileImage === undefined) {
                if(profile_image !== null) {
                    const split = profile_image.split('/')
                    const nameProfileImage = split[split.length-1]  
                    profileImage = nameProfileImage
                }else {
                    profileImage = profile_image
                }
                
            }else {
                const profileImageSize = fileProfileImage.data.length
                const ext = path.extname(fileProfileImage.name)
                profileImage = fileProfileImage.md5 + ext
                const allowType = ['.png', '.jpg', '.jpeg']
                
                if(!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid profile image'})
                if(profileImageSize > 5000000) return res.status(422).json({ msg: 'Image must be lass than 5 MB'})
    
                if(profile_image != null || profile_image != undefined) {
                    const split = profile_image.split('/')
                    const nameProfileImage = split[split.length-1]
                    const profileImagePath = `./public/images/${nameProfileImage}`
                    fs.unlinkSync(profileImagePath)
                } 

                fileProfileImage.mv(`./public/images/${profileImage}`, (err) => {
                    if(err) return res.status(500).json({msg: err.message})
                })
            }

            let profileImageUrl
            if(profileImage !== null) {
                profileImageUrl = `${req.protocol}://${req.get('host')}/images/${profileImage}`
            }else {
                profileImageUrl = null
            }

            const response = await User.update(id, dataUserUpdate, profileImageUrl)
            const { rows } = response
            const { affectedRows } = rows
            
            if(affectedRows > 0) {
                res.status(200).json({
                    msg: 'Data updated successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'Failed to updated data'
                })
            }
        } catch (error) {
            console.info(error.message)
        }
    }
}