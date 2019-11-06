pragma solidity ^0.5.6;

// import "./ERC721/ERC721.sol";
// import "./ERC721/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract MakersToken is ERC721Full {

    event MakersUploaded
    (uint256 indexed tokenId, bytes photo, string title, string description, int targetKlay, string D_day, uint256 timestamp);

    constructor(string memory name, string memory symbol) ERC721Full(name, symbol) public {}

    // Makers 배열
    mapping (uint256 => Makers) public _MakersList; 
    // Makers 마다 모금액 -> 최종 모금액이 얼마인지 확인 하기위해 필요한 mapping
    mapping (uint256 => int) public _totalKlayList;
    
    struct Makers{
        uint256 tokenId;
        address[] buyer;
        bytes photo;
        string title;
        string description;
        int targetKlay;
        string D_day;
        uint256 status;
        uint256 timestamp;
        uint256 count;
    }

    function uploadMakers
    (bytes memory photo, string memory title, string memory description, int targetKlay,  string memory D_day) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory buyer;

        Makers memory newMakers = Makers({
            tokenId : tokenId, 
            buyer : buyer, // 투자자들
            photo : photo, // 사진
            title : title, // 제목
            description : description, // 설명
            targetKlay : targetKlay, // 목표 금액
            D_day : D_day, // 마감일
            status : 1, // 투자 상태 -> 0 이면 종료 / 1 이면 진행 / 2 이면 목표금액 달성된 메이커스.
            count : 0,
            timestamp : now
        });

        _MakersList[tokenId] = newMakers;


        emit MakersUploaded(tokenId, photo, title, description, targetKlay, D_day, now);
    }

    function getTotalMakersCount () public view returns (uint) {
        return totalSupply();
    }

    // 메이커스 불러오기
    function getMakers (uint _tokenId) public view
    returns(uint256, bytes memory, string memory, string memory, int, string memory, uint256) {
        return (
            _MakersList[_tokenId].tokenId,
            _MakersList[_tokenId].photo,
            _MakersList[_tokenId].title,
            _MakersList[_tokenId].description,
            _MakersList[_tokenId].targetKlay,
            _MakersList[_tokenId].D_day,
            _MakersList[_tokenId].status
        );
    }
    // 메이커스 투자하기.
    // 중복 투자 예외처리하기.
    function investMakers(uint256 tokenId) public payable {
        //중복 투자 예외처리
        require(msg.sender != ownerOf(tokenId), "메이커스 당사자는 투자못함.");
        // require(_MakersList[tokenId].D_day, "기간이 지남"); // 날짜 유효성 판단을 어떻게 할 지 아직 못정함.
        require(_MakersList[tokenId].targetKlay >= _totalKlayList[tokenId],"모금 금액을 모두 달성함");
        _MakersList[tokenId].count += 1;
        address MakersOwner = ownerOf(tokenId);
        address payable payableTokenSeller = address(uint160(MakersOwner));
        payableTokenSeller.transfer(msg.value); // 메이커스 Token의 owner 계정으로 klay 송금
        _totalKlayList[tokenId] += 1; // 메이커스 목표 금액을 다루는 list에 klay 추가
        _MakersList[tokenId].buyer.push(msg.sender); // 메이커스 투자자들 push
        //
    }

    // 현재 모금액 얼마인지 확인하는 함수
    function parentStateMakers(uint256 _tokenId) public view returns (int) {
        return _totalKlayList[_tokenId];
    }

    // 투자자 확인 함수.
    function showInvestor(uint256 _tokenId) public view returns(address[] memory) {
        return _MakersList[_tokenId].buyer;
    }

    // 중복 투자 true false
    function overlappingInvestment(uint256 _tokenId, address _investor) public view returns(bool) {
        address[] memory investors = _MakersList[_tokenId].buyer;
        uint256 len = _MakersList[_tokenId].count;
        for (uint256 i=0; i<len; i++){
            if(_investor == investors[i]){
                return false;
            }
        }

    }

    // 메이커스 마감 시, 환불 함수

    function returnklay(uint256 _tokenId) public payable returns (bool) {
        address[] memory investors = _MakersList[_tokenId].buyer;
        uint256 len = _MakersList[_tokenId].count;
        for (uint256 i=0; i<len; i++){
            address payable payableTokenSeller = address(uint160(investors[i]));
            payableTokenSeller.transfer(msg.value);
        }
        return true;
    }

    // Klay 송금  (제품 구매 로직)

    // param1 : 판매자 지갑 주소
    // param2 : 상품 가격(klay)

    function purchaseToken(address walletAddress, uint256 price) public payable {
        require(msg.value >= price, "caller sent klay lower than price");
        address payable payableTokenSeller = address(uint160(walletAddress));
        payableTokenSeller.transfer(msg.value);
     }
}
