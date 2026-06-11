import styled, { createGlobalStyle } from "styled-components";
import {Select as BaseSelect} from "antd";

export const SelectDropdownStyles = createGlobalStyle`
    .ant-select {
        display: flex;
        align-items: center;
    }
    .select-dropdown.ant-select-dropdown {
        border-radius: 12px;
        padding: 8px;
        margin-top: 8px;
        background-color: #fff;
        box-shadow: 0 4px 32px 0 rgba(24, 25, 45, 0.12);
    }
    .select-dropdown.ant-select-dropdown .ant-select-item {
        margin-bottom: 4px;
    }
    .select-dropdown.ant-select-dropdown .ant-select-item-group {
        border-bottom: 1px solid ${({ theme }) => theme.strokePrimary};
        padding: 8px 8px 8px 12px;
        font-family: ${({ theme }) => theme.homeFontFamily};
        font-weight: 600;
        font-size: 14px;
        height: 48px;
        line-height: 120%;
        text-transform: uppercase;
        color: ${({ theme }) => theme.textSecondary};;

        display: flex;
        align-items: end;
    }

    .select-dropdown.ant-select-dropdown .ant-select-item-option {
        padding: 8px;
        display: flex;
        gap: 4px;
        align-items: start;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        font-family: ${({ theme }) => theme.homeFontFamily};
        color: ${({ theme }) => theme.textPrimary};
    }
    
    .select-dropdown.ant-select-dropdown .ant-select-item-option:hover {
        background: rgba(230, 238, 246, 0.6);
    }
    .select-dropdown.ant-select-dropdown .ant-select-item-option:active {
        background: rgba(230, 238, 246, 0.8);
    }
    .select-dropdown.ant-select-dropdown .ant-select-item-option:focus-visible {
        border-radius: 12px;
        outline: 2px solid ${({ theme }) => theme.strokeAccent};
        outline-offset: -2px;
    }
    .select-dropdown.ant-select-dropdown .ant-select-item-option-selected {
        background-color: #e5f6f5;
    }
`

export const Container = styled.div`
  display: flex;
    flex-direction: column;
`

export const Select = styled(BaseSelect)`
    border: 1px solid ${({ theme }) => theme.strokeSecondary};
    border-radius: 12px;
    outline: none;
    padding: 0 16px;
    height: 56px;
    cursor: pointer;
    
    && .ant-select-placeholder {
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: ${({ theme }) => theme.textSecondary};
}
`

export const Label = styled.label<{ $required?: boolean; $woRedStar?: boolean }>`
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  color: #2a2b2c;
  margin-bottom: 7px;
`;

export const Description = styled.div`
    margin-top: 4px;
    font-family: 'Manrope', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #7a8a99;
`

type ArrowProps = {
  isOpen?: boolean;
};

export const Arrow = styled.div<ArrowProps>`
    position: absolute;
    top: 50%;
    right: 16px;
    display: block;
    width: 16px;
    height: 9px;
    margin: auto;
    background-image: url('/bracket_new_select.svg');
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: contain;
    background-size: contain;
    transition: 0.3s transform, 0.3s -webkit-transform;

    transform: translateY(-50%)
    rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
`