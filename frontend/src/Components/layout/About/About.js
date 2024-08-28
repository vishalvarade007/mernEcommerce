import React from 'react';
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { Facebook, Instagram } from "@mui/icons-material";
import vishalpic from "../../../vishalpic.jpg";
import {Metadata} from "../Metadata";

export function About() {
    const visitInstagram = () => {
        window.location("https://instagram.com/vishalvarade__");
    }
    return (
        <>
        <Metadata title={"About Us"}/>
        <div className='aboutSection'>
            
            <div></div>
            <div className='aboutSectionGradient'></div>
            <div className='aboutSectionContainer'>
                <Typography component={"h1"}>About Us</Typography>
                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src={vishalpic}
                            alt="Founder" />
                        <Typography>Vishal Varade</Typography>
                        <Button onClick={visitInstagram} color='primary'>
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @vishalvarade. Only with the
                            purpose to learn MERN Stack.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Social Media</Typography>
                        <a
                            href="https://www.facebook.com/vishal.varade.100"
                            target="blank"
                        >
                            <Facebook className="fbSvgIcon" />
                        </a>

                        <a href="https://instagram.com/vishalvarade__" target="blank">
                            <Instagram className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
