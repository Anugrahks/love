import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Message = {
    sender : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type UserSettings = {
    names : [Text];
    anniversaryDate : Time.Time;
    customMessages : [Text];
  };

  public type UserProfile = {
    name : Text;
  };

  module Message {
    public func compareByTimestamp(message1 : Message, message2 : Message) : Order.Order {
      Int.compare(message1.timestamp, message2.timestamp);
    };
  };

  let userSettings = Map.empty<Principal, UserSettings>();
  let messages = List.empty<Message>();
  let defaultStrings = Map.empty<Text, Text>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions (required by guidelines)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user: Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project configuration functions
  public shared ({ caller }) func saveUserSettings(settings : UserSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save settings");
    };
    userSettings.add(caller, settings);
  };

  public query ({ caller }) func getUserSettings() : async ?UserSettings {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve settings");
    };
    userSettings.get(caller);
  };

  public query ({ caller }) func getSortedMessages() : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };
    messages.toArray().sort(Message.compareByTimestamp);
  };

  public shared ({ caller }) func saveDefaultString(key : Text, value : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can save default strings");
    };
    defaultStrings.add(key, value);
  };

  public query ({ caller }) func getDefaultString(key : Text) : async ?Text {
    // Default strings can be accessed by any authenticated user (not guests)
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access default strings");
    };
    defaultStrings.get(key);
  };
};
