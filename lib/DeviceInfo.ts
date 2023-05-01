import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { supabase } from './SupabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class DeviceInfo {
    static async sendDeviceInfo(): Promise<void> {
        if (await AsyncStorage.getItem("device_info_sent") === "true") {
            return;
        }
        const deviceInfo = {
            id: Crypto.randomUUID(),
            brand: Device.brand,
            osName: Device.osName,
            osVersion: Device.osVersion,
            modelName: Device.modelName,
            deviceName: Device.deviceName,
            deviceYearClass: Device.deviceYearClass,
            isDevice: Device.isDevice,
            supportedCpuArchitectures: Device.supportedCpuArchitectures,
            totalMemory: Device.totalMemory,
            uptime: Platform.OS === "web" ? null : Math.round(await Device.getUptimeAsync()),
        }
        try {
            const { error } = await supabase.from("device_info").insert(deviceInfo);
            if (error) throw error;
            await AsyncStorage.setItem("device_info_sent", "true");
        }
        catch (error) {
            console.log(error);
        }
        
    }
    static getBrand(): string {
        return Device.brand ?? "Unknown";
    }
    static getOSName(): string {
        return Device.osName ?? "Unknown";
    }
    static getOSVersion(): string {
        return Device.osVersion ?? "Unknown";
    }
    static getModelName(): string {
        return Device.modelName ?? "Unknown";
    }
    static getDeviceName(): string {
        return Device.deviceName ?? "Unknown";
    }
    static getDeviceYearClass(): number {
        return Device.deviceYearClass ?? 0;
    }
    static isDevice(): boolean {
        return Device.isDevice ?? false;
    }
    static getSupportedCpuArchitectures(): string[] {
        return Device.supportedCpuArchitectures ?? [];
    }
    static getTotalMemory(): number {
        return Device.totalMemory ?? 0;
    }
    static async getUptimeAsync(): Promise<number> {
        return Platform.OS === "web" ? 0 : await Device.getUptimeAsync();
    }
}