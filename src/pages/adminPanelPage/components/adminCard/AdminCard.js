import React from 'react';
import styled from 'styled-components';


const AdminCard = ({ heading, title, color, iconComp, footer }) => {

    const CardMenuDiv = styled.div`
        width: 200px;
        height: 120px;
        margin: 30px 0 10px;
        background: #f8f8f8;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        position: relative;
        transition: all 0.3s linear;

        .content {
            width: 100%;
            height: 100%;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            font-size: 16px;

            .content-up {
                flex: 70%;
                display: flex;
                justify-content: flex-end;
                border-bottom: 1px solid #d5d5d5;

                .icon {
                    position: absolute;
                    top: -20px;
                    left: 10px;
                    width: 75px;
                    height: 75px;
                    background: ${ props => color};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 100;
                    font-weight: 500;
                    border-radius: 5px;
                    font-size: 35px;
                    color: white;
                }
                .text {
                    text-align: right;
                    width: 100%;
                    span {
                        font-size: 16px;
                        color: grey;
                        text-align: right;
                        padding-bottom: 10px;
                        display: block;
                    }
                    h5 {
                        text-align: right;
                        display: block;
                    }
                }
            }
            .content-down {
                flex: 30%;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .footer {
                    color: grey;
                    padding-top: 5px;
                    font-weight: 200;

                    span:nth-of-type(1) {
                        font-size: 16px;
                        padding-right: 5px;
                    }
                    span:nth-of-type(2) {
                        font-size: 11px;
                    }
                }
            }
        }

        &:hover {
            transform: scale(1.03);
            cursor: pointer;
            box-shadow: 2px 2px 3px ${ props => color};
        }
    `;

    return (
        <CardMenuDiv>
            <div className="content">
                <div className="content-up">
                    <div className="icon">
                        {iconComp}
                    </div>
                    <div className="text">
                        <span>{heading}</span>
                        <h5>{title}</h5>
                    </div>
                </div>
                <div className="content-down">
                    {footer}
                </div>
            </div>
            
            
        </CardMenuDiv>
    )
}

export default AdminCard;