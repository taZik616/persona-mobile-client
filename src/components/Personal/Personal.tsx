import React from 'react'

import {format} from 'date-fns'
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import {ChevronRightIcon} from 'ui/icons/common'
import {Header, SafeLandscapeView, Spacer, Text} from 'ui/index'

import {selectProfile, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'

import {InfoLine} from './InfoLine'

interface PersonalProps {
  onPressChangeInfo?: () => void
  onPressChangePassword?: () => void
}
export const Personal = ({
  onPressChangePassword,
  onPressChangeInfo,
}: PersonalProps) => {
  const {email, dob, name, surname, phoneNumber} =
    useTypedSelector(selectProfile)

  const isValidDob = !isNaN(Date.parse(dob ?? ''))
  return (
    <>
      <Header
        showBack
        title="Профиль"
        rightText="Сменить"
        onPressRightText={onPressChangeInfo}
      />
      <ScrollView>
        <SafeLandscapeView safeArea>
          <Spacer height={24} />
          <InfoLine value={name} field="Имя" />
          <Spacer height={18} />
          <InfoLine value={surname} field="Фамилия" />
          <Spacer height={18} />
          <InfoLine
            value={
              dob && isValidDob
                ? format(new Date(dob), 'dd.MM.yyyy')
                : undefined
            }
            field="Дата рождения"
          />
          <Spacer height={30} />
          <Text gp2>Контактные данные</Text>
          <Spacer height={20} />
          <InfoLine value={email} field="E-mail" />
          <Spacer height={18} />
          <InfoLine value={phoneNumber} field="Телефон" />
          <Spacer height={30} />
          <Text gp2>Конфиденциальность</Text>
          <Spacer height={10} />
          <TouchableOpacity
            style={styles.changePasswordContainer}
            onPress={onPressChangePassword}>
            <Text gp4>Изменить пароль</Text>
            <ChevronRightIcon />
          </TouchableOpacity>
          <Spacer height={20} withBottomInsets />
        </SafeLandscapeView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  changePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: Color.border,
    borderBottomWidth: 1,
  },
})
