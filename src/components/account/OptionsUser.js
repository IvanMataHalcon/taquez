import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function OptionUser(props) {
  const { reload } = props;
  const [showModal, setShowModal] = useState(false);
  const [contained, setContained] = useState(null);
  const openClose = () => setShowModal((prevSate) => !prevSate);

  const selectComponent = (word) => {
    if (word == "displayName") {
      setContained(<ChangeDisplayNameForm close={openClose} reload={reload}/>);
    }
    if (word == "password") {
      setContained(<ChangePasswordForm close={openClose}/>);
    }
    if(word == "email"){
      setContained(<ChangeEmailForm close={openClose} reload={reload}/>)
    }

    openClose();
  };

  const optionsMenu = getOptionsMenu(selectComponent);
  return (
    <View>
      {map(optionsMenu, (menu, index) => (
        <ListItem key={index} onPress={menu.onPress}>
          <Icon
            type={menu.typeIcon}
            name={menu.nameIconLeft}
            color={menu.colorIcon}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.typeIcon}
            name={menu.nameIconRight}
            color={menu.colorIcon}
          />
        </ListItem>
      ))}
      <Modal
        visible={showModal}
        close={() => openClose()}
        children={contained}
      />
    </View>
  );
}

function getOptionsMenu(selectComponent) {
  return [
    {
      title: "Cambiar Nombre",
      typeIcon: "material-community",
      nameIconLeft: "account-circle",
      nameIconRight: "chevron-right",
      colorIcon: "#ccc",
      onPress: () => selectComponent("displayName"),
    },
    {
      title: "Cambiar contraseña",
      typeIcon: "material-community",
      nameIconLeft: "lock-reset",
      nameIconRight: "chevron-right",
      colorIcon: "#ccc",
      onPress: () => selectComponent("password"),
    },
    {
      title: "Cambiar correo electronico",
      typeIcon: "material-community",
      nameIconLeft: "email",
      nameIconRight: "chevron-right",
      colorIcon: "#ccc",
      onPress: () => selectComponent("email"),
    },
  ];
}

const styles = StyleSheet.create({});
