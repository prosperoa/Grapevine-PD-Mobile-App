import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Camera, PictureResponse } from 'expo';

interface CameraProps {
  close: any;
  onTakePicture: (data: PictureResponse) => void;
}

interface CameraState {
  type: string;
}

export default class extends React.Component<CameraProps, CameraState> {
  public cameraRef: any;
  public state: Readonly<CameraState> = {
    type: Camera.Constants.Type.back
  };

  public onTakePicture = (): void => {
    if (!this.cameraRef) return;

    this.cameraRef.takePictureAsync({base64: true})
      .then((options: PictureResponse) => this.props.onTakePicture(options));
  };

  public render(): JSX.Element {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref: any) => this.cameraRef = ref}
          style={{ flex: 1, padding: 15 }}
          type={this.state.type}>
          <TouchableOpacity
            style={{ flex: 1, alignSelf: 'flex-start', marginTop: 25 }}
            onPress={this.props.close}>
            <Icon name="close" iconStyle={{ color: '#fff', fontSize: 25 }} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
              }}>
              <Icon
                name="switch-camera"
                iconStyle={{ color: '#fff', fontSize: 25, marginBottom: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0.8, alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={this.onTakePicture}>
              <Icon
                name="camera"
                iconStyle={{ color: '#fff', fontSize: 50, marginBottom: 10 }} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}